import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAboutContent } from "@/hooks/useSiteData";
import { getIcon } from "@/lib/iconMap";

type CoreValue = { icon: string; title: string; desc: string };

const MissionVisionValues = () => {
  const { data } = useAboutContent();
  const mission = data?.mission || "";
  const vision = data?.vision || "";
  const coreValues = (data?.core_values as CoreValue[] | null) ?? [];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
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
                <p className="text-muted-foreground font-body leading-relaxed">{mission}</p>
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
                <p className="text-muted-foreground font-body leading-relaxed">{vision}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {coreValues.length > 0 && (
          <>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
                What We Stand For
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
                Our Core Values
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((v, i) => {
                const Icon = getIcon(v.icon);
                return (
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
                          <Icon className="h-6 w-6 text-secondary" />
                        </div>
                        <h4 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h4>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">{v.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MissionVisionValues;
