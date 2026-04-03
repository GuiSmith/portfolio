import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-5">
      <div className="container container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {eyebrow ? <div className="text-uppercase small muted mb-2">{eyebrow}</div> : null}
          <h2 className="mb-3">{title}</h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

