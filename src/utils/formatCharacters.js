export default function formatCharacters(arr) {
  return arr.map((word) => word[0].toUpperCase() + word.slice(1)).join(", ");
}
