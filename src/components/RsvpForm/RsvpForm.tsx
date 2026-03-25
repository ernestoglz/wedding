import type { Guest, GuestStatus } from '@/types/guest';
import { GenericForm, PersonalizedForm } from './components';

type IProps = {
  guest?: Guest | null;
  guestStatus?: GuestStatus;
};

export const RsvpForm = (props: IProps) => {
  const { guest, guestStatus } = props;
  const isPersonalized = guestStatus === 'found' && !!guest;

  if (guestStatus === 'loading' || guestStatus === 'not-found' || guestStatus === 'error') {
    return null;
  }

  if (isPersonalized && guest.confirmado) {
    return null;
  }

  if (isPersonalized) {
    return <PersonalizedForm guest={guest} />;
  }

  return <GenericForm />;
};
