export default function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const thisDate = new Date();
  let year = thisDate.getFullYear() - birthDate.getFullYear();
  const month = thisDate.getMonth() - birthDate.getMonth();
  const day = thisDate.getDate() - birthDate.getDate();
  if (month < 0 || (month === 0 && day < 0)) {
    year--;
  }
  return year;
}
