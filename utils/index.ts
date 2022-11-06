export function calcDistanceNautical(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R: number = 3440.065; // Radius of the Earth in Nautical Miles
  const phi1: number = deg2rad(lat1);
  const phi2: number = deg2rad(lat2);

  const dLambda: number = deg2rad(lon2 - lon1);
  const distance: number =
    Math.acos(
      Math.sin(phi1) * Math.sin(phi2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.cos(dLambda)
    ) * R;

  return distance;
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
