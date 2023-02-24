import s from "./style.module.css";
export function Logo({ image, title, subtitle, onClick }) {
  return (
    <div className={s.container} onClick={onClick}>
      <div className={s.subContainer}>
        <span className={s.img}>{image}</span>
        <div className={s.logo_txt}>{title}</div>
      </div>
      <div className={s.subtitle}>{subtitle}</div>
    </div>
  );
}
