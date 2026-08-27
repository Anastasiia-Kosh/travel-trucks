import type { Camper } from "@/types/camper";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
}
export default function CamperList({ campers }: CamperListProps) {
  return (
    <ul className={css.list}>
      {campers.map((camper, index) => (
        <li key={camper.id}>
          <CamperCard camper={camper} eagerImage={index === 0} />
        </li>
      ))}
    </ul>
  );
}
