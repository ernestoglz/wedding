import Celebration from '@/assets/celebration.svg?react';
import Cheers from '@/assets/cheers.svg?react';
import Church from '@/assets/church.svg?react';
import Cocktail from '@/assets/cocktail.svg?react';
import Confirmation from '@/assets/confirmation.svg?react';
import Dinner from '@/assets/dinner.svg?react';
import Dress from '@/assets/dress.svg?react';
import Gift from '@/assets/gift.svg?react';
import Music from '@/assets/music.svg?react';
import Party from '@/assets/party.svg?react';
import Reception from '@/assets/reception.svg?react';
import Spotify from '@/assets/spotify.svg?react';
import Suit from '@/assets/suit.svg?react';
import WeddingRings from '@/assets/wedding-rings.svg?react';

const ICON_MAP = {
  celebration: Celebration,
  cheers: Cheers,
  church: Church,
  cocktail: Cocktail,
  confirmation: Confirmation,
  dinner: Dinner,
  dress: Dress,
  gift: Gift,
  music: Music,
  party: Party,
  reception: Reception,
  spotify: Spotify,
  suit: Suit,
  'wedding-rings': WeddingRings,
};

export type IconName = keyof typeof ICON_MAP;

type IProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = (props: IProps) => {
  const { name, size = 64, color = 'currentColor', className } = props;
  const SvgComponent = ICON_MAP[name];

  return (
    <SvgComponent
      width={size}
      height={size}
      fill={color}
      className={className}
    />
  );
};
