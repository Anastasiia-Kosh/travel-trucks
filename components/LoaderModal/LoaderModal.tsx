import css from "./LoaderModal.module.css";
import { Oval } from "react-loader-spinner";

export default function LoaderModal() {
  return (
    <div className={css.overlay} role="status" aria-live="polite">
      <div className={css.modal}>
        <Oval
          width={72}
          height={72}
          color="#6d7b75"
          secondaryColor="#f7f7f7"
          strokeWidth={4}
          strokeWidthSecondary={4}
          ariaLabel="Loading campers"
        />
        <h2 className={css.title}>Loading trucks...</h2>

        <p className={css.description}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
}
