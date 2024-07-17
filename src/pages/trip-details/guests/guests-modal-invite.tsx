import { Mail, User, X } from "lucide-react";
import { Button } from "../../../components/button";
import { format } from "date-fns";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface GuestsModalProps {
    closeGuestsInviteModal: () => void;
    destination?: string;
    startsAt?: string;
    endsAt?: string; 

}

export function GuestsModal ({
    closeGuestsInviteModal, 
    destination,
    startsAt,
    endsAt,
 
    }: GuestsModalProps) {
      
     
    const { tripId } = useParams();
      

      const formattedDateRange = startsAt && endsAt
        ? `${format(startsAt, "dd/MM/yyyy")} até ${format(endsAt, "dd/MM/yyyy")}`
        : '';
        
        

        async function inviteGuests(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
  
          const data = new FormData(event.currentTarget)
  
          const name = data.get('name')?.toString()
          const email = data.get('email')?.valueOf()
          
          await api.post(`/trips/${tripId}/invite`, {
            name,
            email,
          })
  
          window.document.location.reload();
      }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>

              <h2 className='text-lg font-semibold'>Convidar participantes</h2>
              <button type='button' onClick={closeGuestsInviteModal}>
                <X 
                className='size-5 text-zinc-400' />
              </button>

            </div>
            <p className='text-sm text-zinc-400'>
                        Você foi convidado(a) para participar de uma viagem para{' '}
                        <span className='text-zinc-100 font-semibold'>{destination}</span> nas datas de{' '}
                        <span className='text-zinc-100 font-semibold'>{formattedDateRange}</span>.
                        Para confirmar sua presença na viagem, preencha seus dados abaixo:
                    </p>
          </div>

          <form
           onSubmit={inviteGuests} 
           className='space-y-3'>

            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>

              <User
                className='text-zinc-400 size-5' />
              <input
                type="text" 
                name='name' 
                placeholder="Seu nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>

            </div>

            <div 
            className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Mail className='text-zinc-400 size-5'/>
              <input
                type="text" 
                name='email' 
                placeholder="Seu e-mail pessoal"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
                
            </div>

            <Button
             size="full">
             Convidar participante
            </Button>
          </form>
        </div>
      </div>
    )
}