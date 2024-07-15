import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { GuestsModal } from "./guests-modal-invite";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Trip {
    id: string;
    destination: string;
    startsAt: string;
    endsAt: string;
    isConfirmed: boolean;
}

export function TripDetailsPage() {
    const { tripId } = useParams<{ tripId: string }>();
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [isGuestsInviteModalOpen, setIsGuestsInviteModalOpen] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [trip, setTrip] = useState<Trip | undefined>();

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => {
            setTrip(response.data);
        }).catch(error => {
            console.error('Error fetching trip details:', error);
        });
    }, [tripId]);

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true);
    }
    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false);
    }

    function openGuestsInviteModal() {
        setIsGuestsInviteModalOpen(true);
    }
    function closeGuestsInviteModal() {
        setIsGuestsInviteModalOpen(false);
    }

    
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

            <DestinationAndDateHeader />

            <main className="flex gap-16 px-5">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Atividades
                        </h2>


                        <Button
                            onClick={openCreateActivityModal}
                            variant="primary">
                            <Plus className='size-5' />
                            Cadastrar atividades
                        </Button>
                    </div>


                    <Activities />
                </div>

                <div className="w-80 space-y-6">

                    <ImportantLinks />

                    <div className='w-full h-px bg-zinc-800' />

                    <Guests
                        openGuestsInviteModal={openGuestsInviteModal} />

                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModal={closeCreateActivityModal} />
            )}

            {isGuestsInviteModalOpen && (
                <GuestsModal
                    destination={trip?.destination}
                    startsAt={trip?.startsAt}
                    endsAt={trip?.endsAt}
                    setOwnerName={setOwnerName}
                    setOwnerEmail={setOwnerEmail}
                    closeGuestsInviteModal={closeGuestsInviteModal} />
            )}
        </div>
    )
}