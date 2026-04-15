import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nyamahoro Aimee",
    relation: "Daughter of Client",
    text: "Impire Home Care has been a blessing for our family. The caregivers are incredibly kind and professional. My mother looks forward to their visits every day.",
  },
  {
    name: "Robert Musore",
    relation: "Client",
    text: "I was reluctant about having someone come to my home, but the team at Impire made me feel comfortable from day one. They truly care about my well-being.",
  },
  {
    name: "Sarah Nyamahoro",
    relation: "Daughter of Client",
    text: "The level of communication and transparency is outstanding. We always know how Dad is doing, and the care plans are customized perfectly to his needs.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            What Families Say About Us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border relative"
            >
              <Quote className="h-8 w-8 text-secondary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground/80 font-body leading-relaxed mb-6 text-sm italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-body">{t.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
