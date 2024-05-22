export const formatDate = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; // Конвертация в 12-часовой формат
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // общая форма для чисел от 4 до 20
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${formattedHours}:${formattedMinutes}${ampm} ${month} ${day}${suffix(
    day
  )}`;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
