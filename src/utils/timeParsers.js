export const durationParser = (segments) =>
  segments.map((segment) => {
    let hours = Math.floor(segment.duration / 60);
    let minutes = segment.duration - hours * 60;
    return `${hours}ч ${minutes}м`;
  });
export const dateParser = (segments) =>
  segments.map((segment) => {
    const startDate = new Date(segment.date);
    let startTime = [
      addZero(startDate.getHours()),
      addZero(startDate.getMinutes()),
    ];
    const endDate = new Date();
    endDate.setTime(startDate.getTime() + segment.duration * 1000 * 60);
    let arrivalTime = [
      addZero(endDate.getHours()),
      addZero(endDate.getMinutes()),
    ];
    return `${startTime[0]}:${startTime[1]} - ${arrivalTime[0]}:${arrivalTime[1]}`;
  });

const addZero = (number) => {
  if (number > 9) return number + "";
  return `0${number}`;
};
