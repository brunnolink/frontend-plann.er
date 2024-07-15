import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
 

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
    destination: string;
    range: DateRange | undefined;
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,
    destination,
    range
}: ConfirmTripModalProps) {
  
  const formattedDateRange = range && range.from && range.to
        ? `${format(range.from, "dd/MM/yyyy")} até ${format(range.to, "dd/MM/yyyy")}`
        : '';
    return (
               
<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>

                <h2 className='text-lg font-semibold'>Confirmar criação de viagens</h2>
                <button type='submit' onClick={closeConfirmTripModal}>
                  <X 
                  className='size-5 text-zinc-400' />
                </button>

              </div>
              <p className='text-sm text-zinc-400'>
              Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>{destination}</span> nas datas de <span className='text-zinc-100 font-semibold'>{formattedDateRange}</span> preencha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={createTrip}
             className='space-y-3'>

              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>

                <User
                  className='text-zinc-400 size-5' />
                <input
                  type="text" 
                  name='name' 
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={event => setOwnerName(event.target.value)} />

                

              </div>

              <div 
              className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Mail className='text-zinc-400 size-5'/>
                <input
                  type="text" 
                  name='email' 
                  placeholder="Seu e-mail pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                  onChange={event => setOwnerEmail(event.target.value)} />
                  
              </div>

              <Button type="submit" size="full">
               Confirmar criação da viagem
              </Button>
            </form>
          </div>
        </div>
        
    )
}