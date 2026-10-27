import { routes } from '../routes';

export const formatCoat = (coat: string, suffix: string) => `${coat} ${suffix}`;

export const getBreedHref = (name: string) => `${routes.breed}?${new URLSearchParams({ name })}`;
