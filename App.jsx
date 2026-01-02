import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Factory,
  Truck,
  Ruler,
  Gauge,
  BadgeCheck,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Josh Fabrication – single-file React site
// - Tailwind CSS assumed
// - No external routing; anchor navigation

const cx = (...classes) => classes.filter(Boolean).join(" ");

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-20">
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        {eyebrow ? (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-base leading-relaxed text-zinc-600 md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Card = ({ className, children }) => (
  <div
    className={cx(
      "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm">
    {children}
  </span>
);

const TopNav = ({ active, onNav }) => {
  const links = [
    { id: "capabilities", label: "Capabilities" },
    { id: "industries", label: "Industries" },
    { id: "quality", label: "Quality" },
    { id: "equipment", label: "Equipment" },
    { id: "logistics", label: "Logistics" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            onNav("top");
          }}
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white shadow-sm">
            <Factory className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-zinc-900">
              Josh Fabrication, LLC
            </div>
            <div className="text-xs text-zinc-600">Precision Manufacturing • Logistics</div>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNav(l.id);
              }}
              className={cx(
                "rounded-xl px-3 py-2 text-sm transition",
                active === l.id
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNav("contact");
            }}
            className="hidden rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 md:inline-flex"
          >
            Request a Quote
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNav("contact");
            }}
            className="inline-flex rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="md:hidden">
        <div className="mx-auto max-w-6xl px-4 pb-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(l.id);
                }}
              >
                <Pill>
                  <span
                    className={cx(
                      "text-sm",
                      active === l.id ? "font-semibold text-zinc-900" : "text-zinc-700"
                    )}
                  >
                    {l.label}
                  </span>
                </Pill>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }) => (
  <Card>
    <div className="flex items-start gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-base font-semibold text-zinc-900">{title}</div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{desc}</p>
      </div>
    </div>
  </Card>
);

const Stat = ({ value, label }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
    <div className="text-2xl font-semibold tracking-tight text-zinc-900">{value}</div>
    <div className="mt-1 text-sm text-zinc-600">{label}</div>
  </div>
);

const Checklist = ({ items }) => (
  <ul className="space-y-3">
    {items.map((it) => (
      <li key={it} className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-zinc-900" />
        <span className="text-sm leading-relaxed text-zinc-700">{it}</span>
      </li>
    ))}
  </ul>
);

function useActiveSection(sectionIds) {
  const [active, setActive] = useState("top");

  React.useEffect(() => {
    const ids = ["top", ...sectionIds];
    const els = ids
      .map((id) => (id === "top" ? document.getElementById("top") : document.getElementById(id)))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.05, 0.1, 0.2] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

export default function JoshFabricationSite() {
  const sectionIds = useMemo(
    () => ["capabilities", "industries", "quality", "equipment", "logistics", "contact"],
    []
  );
  const active = useActiveSection(sectionIds);

  const scrollTo = (id) => {
    const el = document.getElementById(id === "top" ? "top" : id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(
      `RFQ / Inquiry — Josh Fabrication (from ${form.name || "Website Visitor"})`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        "Message:",
        form.message,
      ].join("\n")
    );
    // TODO: replace with your preferred email
    return `mailto:info@joshfabrication.com?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <div id="top" className="min-h-screen bg-zinc-50 text-zinc-900">
      <TopNav active={active} onNav={scrollTo} />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-zinc-200/70 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-zinc-300/50 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2">
                <Pill>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Quality-first manufacturing
                  </span>
                </Pill>
                <Pill>
                  <span className="inline-flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Flexible logistics support
                  </span>
                </Pill>
                <Pill>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" /> DoD-ready workflows
                  </span>
                </Pill>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                Precision parts, dependable delivery.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                Josh Fabrication, LLC provides CNC machining and fabrication for aerospace,
                defense, industrial, and commercial customers—backed by rigorous quality
                practices and responsive communication.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contact");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#capabilities"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("capabilities");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
                >
                  Explore Capabilities
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat value="Fast" label="Quote turnaround" />
                <Stat value="Tight" label="Tolerances" />
                <Stat value="Traceable" label="Materials" />
                <Stat value="On-time" label="Delivery focus" />
              </div>

              <p className="mt-6 text-xs text-zinc-500">
                *Replace placeholders (email, address, certifications, equipment list) with your
                official details.
              </p>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Capabilities Snapshot</div>
                      <div className="mt-1 text-sm text-zinc-600">
                        A quick look at what we do best.
                      </div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-900 text-white">
                      <Ruler className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="text-sm font-semibold text-zinc-900">CNC Machining</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        Turning & milling for prototypes through production runs.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="text-sm font-semibold text-zinc-900">Fabrication</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        Precision assemblies, fixtures, and custom components.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="text-sm font-semibold text-zinc-900">Quality & Compliance</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        Documented inspection, traceability, and packaging controls.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Prototype → Production",
                      "Tight Tolerances",
                      "Material Certs",
                      "Inspection Reports",
                      "Responsive Comms",
                    ].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* CAPABILITIES */}
      <Section
        id="capabilities"
        eyebrow="What we do"
        title="Capabilities built for real-world demands"
        subtitle="From one-off parts to repeat production, we focus on consistency, documentation, and delivering exactly what you need."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Gauge}
            title="CNC Turning & Milling"
            desc="Precision machining for metals and engineering plastics—optimized setups, controlled processes, and clear communication."
          />
          <Feature
            icon={ShieldCheck}
            title="Inspection & Traceability"
            desc="First Article / in-process checks, material certs, lot traceability, and inspection documentation to match your requirements."
          />
          <Feature
            icon={Ruler}
            title="Tolerances & Finishes"
            desc="Support for tight tolerances, deburr/edge break requirements, and coordination of common finishes through qualified partners."
          />
          <Feature
            icon={BadgeCheck}
            title="Defense-Ready Packaging"
            desc="Controlled packaging/labeling workflows aligned to customer requirements (including MIL-style packaging when specified)."
          />
          <Feature
            icon={Factory}
            title="Fixtures & Small Assemblies"
            desc="Workholding, fixtures, and assemblies that reduce risk and improve repeatability for production needs."
          />
          <Feature
            icon={Truck}
            title="Delivery & Expedite Support"
            desc="Flexible pickup/delivery options and logistics coordination to keep projects moving and reduce schedule risk."
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <div className="text-sm font-semibold text-zinc-900">Typical Part Types</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Studs, end caps, connectors, custom brackets, turned components, machined blocks,
              bushings, spacers, shafts, and custom fixtures.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Aerospace / Defense parts",
                "Industrial components",
                "Prototypes",
                "Repeat production",
                "Repair parts",
              ].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </Card>
          <Card className="lg:col-span-5">
            <div className="text-sm font-semibold text-zinc-900">How to Request a Quote</div>
            <div className="mt-4">
              <Checklist
                items={[
                  "Send drawing (PDF) + any 3D model if available (STEP/IGES).",
                  "Include material, quantity, finish, and required certifications.",
                  "Provide delivery location + desired due date.",
                  "We confirm questions quickly and quote with lead time options.",
                ]}
              />
            </div>
          </Card>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <div className="border-y border-zinc-200 bg-white">
        <Section
          id="industries"
          eyebrow="Who we serve"
          title="Industries"
          subtitle="We support customers who value quality documentation, schedule discipline, and accountable communication."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Aerospace", "Defense", "Industrial Manufacturing", "Energy", "Construction & Infrastructure", "Commercial Products"].map(
              (industry) => (
                <Card key={industry}>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-zinc-900">{industry}</div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-900 text-white">
                      <Factory className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    Reliable machining & fabrication support with clear documentation and delivery expectations.
                  </p>
                </Card>
              )
            )}
          </div>

          <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold text-zinc-900">Compliance-friendly</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  We’re set up to support customers with documentation, traceability, and controlled processes.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">Partner network</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  When needed, we coordinate common finishing and special processes through qualified vendors.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">Responsive communication</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Direct updates, quick questions, and proactive schedule alignment.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* QUALITY */}
      <Section
        id="quality"
        eyebrow="Quality"
        title="A quality system you can count on"
        subtitle="Our goal is simple: ship conforming parts with the documentation you need—without surprises."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-900">Quality Practices</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  We maintain documented workflows for inspection, nonconformance handling, and traceability.
                  Replace the items below with your exact certifications and procedures.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Checklist
                items={[
                  "Material certification tracking (MTRs/CoCs)",
                  "First Article / in-process checks as required",
                  "Dimensional inspection reporting",
                  "Lot/serial traceability when specified",
                ]}
              />
              <Checklist
                items={[
                  "Document control & revision management",
                  "Packaging/labeling per customer requirements",
                  "Corrective action process",
                  "On-time delivery focus",
                ]}
              />
            </div>
          </Card>

          <Card className="lg:col-span-5">
            <div className="text-sm font-semibold text-zinc-900">Certifications & Standards</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Add the exact list below (examples shown):
            </p>
            <div className="mt-5 space-y-3">
              {[
                { k: "ISO 9001", v: "(add certificate # / scope)" },
                { k: "NIST 800-171", v: "(if applicable)" },
                { k: "NADCAP", v: "(through partners for special processes)" },
              ].map((row) => (
                <div key={row.k} className="flex items-start justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">{row.k}</div>
                    <div className="mt-1 text-sm text-zinc-600">{row.v}</div>
                  </div>
                  <BadgeCheck className="h-5 w-5 text-zinc-900" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* EQUIPMENT */}
      <div className="border-y border-zinc-200 bg-white">
        <Section
          id="equipment"
          eyebrow="Shop"
          title="Equipment & capacity"
          subtitle="Update this section with your exact machine list, sizes, and measurement tools."
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <div className="text-sm font-semibold text-zinc-900">Machines</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Example placeholders (edit to match your shop):
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {["CNC Lathe (3-axis)", "CNC Mill (3-5 axis)", "Bandsaw / cutoff", "Deburr / finishing tools", "Air compressor", "Workholding & fixtures"].map(
                  (m) => (
                    <div key={m} className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                      <Gauge className="mt-0.5 h-5 w-5 text-zinc-900" />
                      <div className="text-sm text-zinc-700">{m}</div>
                    </div>
                  )
                )}
              </div>
            </Card>

            <Card className="lg:col-span-5">
              <div className="text-sm font-semibold text-zinc-900">Measurement & Inspection</div>
              <div className="mt-4">
                <Checklist
                  items={[
                    "Calibrated micrometers & calipers",
                    "Height gauge / surface plate",
                    "Thread gages / pin gages",
                    "Calibration records (add details)",
                  ]}
                />
              </div>
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-semibold text-zinc-900">Materials</div>
                <p className="mt-2 text-sm text-zinc-600">
                  Aluminum, stainless, carbon steel, brass, and plastics — based on spec.
                </p>
              </div>
            </Card>
          </div>
        </Section>
      </div>

      {/* LOGISTICS */}
      <Section
        id="logistics"
        eyebrow="Logistics"
        title="Manufacturing + logistics, under one roof"
        subtitle="We can support pickups, deliveries, and time-sensitive moves to keep your project on track."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-900">Pickup & Delivery</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Coordinate local pickup/delivery when it reduces lead time and improves schedule reliability.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-900">Secure & Accountable</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Documented handoffs, clear communication, and a focus on doing it right the first time.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        eyebrow="Get in touch"
        title="Request a quote or start a conversation"
        subtitle="Share your drawing/specs and we’ll respond quickly with questions, options, and lead times."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-5">
            <div className="text-sm font-semibold text-zinc-900">Contact</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Replace these placeholders with your official business contact information.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <Mail className="mt-0.5 h-5 w-5 text-zinc-900" />
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Email</div>
                  <div className="mt-1 text-sm text-zinc-600">info@joshfabrication.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <Phone className="mt-0.5 h-5 w-5 text-zinc-900" />
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Phone</div>
                  <div className="mt-1 text-sm text-zinc-600">(###) ###-####</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-zinc-900" />
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Location</div>
                  <div className="mt-1 text-sm text-zinc-600">Baltimore, MD (edit as needed)</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="text-sm font-semibold text-zinc-900">Preferred RFQ details</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "PDF drawing",
                  "3D model (STEP)",
                  "Material",
                  "Quantity",
                  "Finish",
                  "Certs",
                  "Ship-to + due date",
                ].map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-7">
            <div className="text-sm font-semibold text-zinc-900">Quick RFQ Form</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              This form opens your email app with a pre-filled message (no backend needed).
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">Name</div>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-zinc-400"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">Company</div>
                <input
                  value={form.company}
                  onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-zinc-400"
                  placeholder="Company (optional)"
                />
              </label>
              <label className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">Email</div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-zinc-400"
                  placeholder="you@company.com"
                />
              </label>
              <label className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">Phone</div>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-zinc-400"
                  placeholder="(###) ###-#### (optional)"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <div className="text-sm font-medium text-zinc-700">Message</div>
              <textarea
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                rows={6}
                className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-zinc-400"
                placeholder="Tell us about your part(s): material, qty, tolerance, finish, due date, and any required certs."
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
              >
                Send RFQ Email <ArrowRight className="h-4 w-4" />
              </a>
              <div className="text-xs text-zinc-500">
                Tip: Attach drawings/models in your email.
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-900">Josh Fabrication, LLC</div>
              <div className="mt-1 text-sm text-zinc-600">
                Precision Manufacturing • Fabrication • Logistics
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "capabilities", label: "Capabilities" },
                { id: "quality", label: "Quality" },
                { id: "contact", label: "Contact" },
              ].map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.id);
                  }}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm hover:bg-zinc-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            © {new Date().getFullYear()} Josh Fabrication, LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
