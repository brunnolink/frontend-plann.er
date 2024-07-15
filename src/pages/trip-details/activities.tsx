import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck } from "lucide-react";

export function Activities() {

    interface Activity {
        id: string;
        title: string;
        occurs_at: string;
    }

    const { tripId } = useParams();
    const [ activities, setActivities ] = useState<Activity[]>([]);
    
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get(`/trips/${tripId}/activities`);
                console.log("Activities Response:", response.data);
                setActivities(response.data); 
            } catch (error) {
                console.error("Erro ao buscar as atividades:", error);
            }
        };

        fetchActivities();
    }, [tripId]);

    const groupActivitiesByWeekday = (activities: Activity[]): { [key: string]: Activity[] } => {
        const groupedActivities: { [key: string]: Activity[] } = {};

        activities.forEach(activity => {
            const date = parseISO(activity.occurs_at);
            const weekday = format(date, 'EEEE', { locale: ptBR });

            if (!groupedActivities[weekday]) {
                groupedActivities[weekday] = [];
            }
            groupedActivities[weekday].push(activity);
        });

        Object.keys(groupedActivities).forEach(weekday => {
            groupedActivities[weekday].sort((a, b) => {
                const dateA = parseISO(a.occurs_at);
                const dateB = parseISO(b.occurs_at);
                return dateA.getTime() - dateB.getTime();
            });
        });

        return groupedActivities;
    };

    const groupedActivities = groupActivitiesByWeekday(activities);

    return ( 
        <div className="space-y-8">
            {Object.keys(groupedActivities).map(weekday => (
                <div key={weekday} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">Dia {format(parseISO(groupedActivities[weekday][0].occurs_at), 'd')}</span>
                        <span className="text-xs text-zinc-500">{weekday}</span>
                    </div>
                    {groupedActivities[weekday].map(activity => (
                        <div key={activity.id} className="space-y-2.5">
                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                <CircleCheck className="size-5 text-lime-300" />
                                <span className="text-zinc-100">{activity.title}</span>
                                <span className="text-zinc-400 text-sm ml-auto">
                                    {format(parseISO(activity.occurs_at), 'HH:mm')}h
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}