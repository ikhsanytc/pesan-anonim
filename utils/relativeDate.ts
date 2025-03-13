import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
export default function relativeDate(date: string) {
  const relativeTime = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  });
  return relativeTime;
}
