import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";




interface GuestsProps {
    openGuestsInviteModal: () => void;
}

  
export function Guests({openGuestsInviteModal}: GuestsProps) {  
   
    interface Participant {
        id: string,
        name: string | null,
        email: string,
        isConfirmed: boolean,
    }

    const [ participants, setParticipants ] = useState<Participant[]>([]);
    const { tripId } = useParams()
    

      useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await api.get(`/trips/${tripId}/participants`);
                console.log("Participants Response:", response.data);
                setParticipants(response.data); 
            } catch (error) {
                console.error("Erro ao buscar os participantes:", error);
            }
        };

        fetchParticipants();
    }, [tripId]);
    
    return (
        <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants.map((participant, index) => (
            <div key={participant.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    
                        <span className="block font-medium text-zinc-100">
                        {participant.email}
                        </span>
                        <span className="block text-sm text-zinc-400 truncate">
                           {participant.name ?? `Convidado ${index}`}
                        </span>
                    
                </div>
                {participant.isConfirmed ? (
                    <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                ) : (
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )}
            </div>
          ))}
        </div>

        <Button
            onClick={openGuestsInviteModal}
            variant="secondary"> 
             <UserCog className='size-5' />
            Gerenciar convidados
        </Button>
    </div>
    )
}