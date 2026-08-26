import type { Camper } from "@/types/camper";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
}
export default function CamperList({ campers }: CamperListProps) {
  return (
    <ul className={css.list}>
      {campers.map((camper) => (
        <li key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
}
