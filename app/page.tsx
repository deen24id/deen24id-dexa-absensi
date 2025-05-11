import { title, subtitle } from "@/components/primitives";
import { Form } from "@/components/form";

const p = 60 * 60 * 1000;
const datetimeNow = new Date();
const sessionStart = new Date(Math.floor(datetimeNow.getTime() / p) * p);
const sessionEnd = new Date(Math.ceil(datetimeNow.getTime() / p) * p - 1);

const sessionDisplay =
  sessionStart.toLocaleDateString() +
  " " +
  sessionStart.toLocaleTimeString() +
  " - " +
  sessionEnd.toLocaleTimeString();

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-4 md:py-6 h-[100%]">
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%]">
        <span className={title({ size: "sm" })}>
          Hai{" "}
          <span className={title({ color: "violet", size: "md" })}>
            Deen24ID
          </span>
        </span>
        <br />
        <span className={title({ color: "violet", size: "md" })}>
          Imaduddin Haetami
        </span>
        <br />
        <span className={title({ size: "sm" })}>lakukan absensi anda</span>
        <br />
        <div className={subtitle({ class: "mt-2" })}>{sessionDisplay}</div>
      </div>
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%]">
        <Form />
      </div>
    </section>
  );
}
