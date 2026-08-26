import css from "./LoaderModal.module.css"
export default function LoaderModal() {
    return (
<div className={css.overlay} role="status" aria-live="polite">
  <div className={css.modal}>
    <div
      className={`ldld bare running ${css.spinner}`}
      aria-hidden="true"
    />

    <h2>Loading tracks...</h2>

    <p>
      Please wait while we fetch the best
      <br />
      travel trucks for you
    </p>
  </div>
</div>
    )
}

