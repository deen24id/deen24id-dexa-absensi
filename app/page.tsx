import { title, subtitle } from "@/components/primitives";
import { Form } from "@/components/form";

const p = 60 * 60 * 1000;
const datetimeNow = new Date();
const sessionStart = new Date(Math.floor(datetimeNow.getTime() / p) * p);

const sessionDisplay = sessionStart.toLocaleDateString();

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 md:gap-0 py-4 md:py-6 h-[100%]">
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%]">
        <span className={title({ size: "sm" })}>
          Hai{" "}
          <span className={title({ color: "violet", size: "sm" })}>
            Deen24ID
          </span>
        </span>
        <span className={title({ color: "violet", size: "sm" })}>
          Imaduddin Haetami
        </span>
        <span className={subtitle()}>Lakukan absensi kamu</span>
        <div className="flex flex-row justify-center gap-4">
          <span>Sesi: {sessionDisplay}</span>
          <span>Status: Ditunggu</span>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%]">
        <Form />
      </div>
    </section>
  );
}
