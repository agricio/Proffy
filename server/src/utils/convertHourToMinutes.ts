export default function conertHourToMinutes( time: string) {
   const [hour, minutes] = time.split(':').map(Number);
   const timeInMinutes = (hour * 60) + minutes;
   console.log(timeInMinutes);
   
   return timeInMinutes;
}