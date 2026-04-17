import { motion } from "framer-motion";
import { Target, Eye, Heart, Shield, Award, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const coreValues = [
  { icon: Heart, title: "Compassion", desc: "We care with empathy, kindness, and respect." },
  { icon: Shield, title: "Integrity", desc: "We uphold honesty and strong ethical standards in everything we do." },
  { icon: Award, title: "Excellence", desc: "We are committed to high-quality care and continuous improvement." },
  { icon: Users, title: "Respect", desc: "We honor the dignity, preferences, and individuality of every client." },
  { icon: CheckCircle2, title: "Reliability", desc: "We provide dependable and consistent care families can trust." },
];

const MissionVisionValues = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                  <Target className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Empire Home Care is committed to delivering compassionate, reliable, and personalized
                  in-home care services that enhance the quality of life for our clients. We promote
                  independence, dignity, and comfort while providing families with peace of mind through
                  trusted, professional support.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full border-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                  <Eye className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Our vision is to become a leading provider of home care services, known for excellence,
                  compassion, and integrity; empowering individuals to live safely and independently in
                  the comfort of their own homes.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
            What We Stand For
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
            Our Core Values
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h4>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
