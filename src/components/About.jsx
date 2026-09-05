import { Award, Leaf, PackageCheck, UsersRound } from "lucide-react";

const points = [
  { icon: Award, title: "Quality Proven", text: "Built around durability, reliability and quality standards." },
  { icon: PackageCheck, title: "Wide Product Range", text: "Home appliances, fans and heating products across multiple categories." },
  { icon: Leaf, title: "Energy Efficient", text: "Products are presented with a focus on efficient, user-friendly operation." },
  { icon: UsersRound, title: "Customer Focus", text: "Maxwell's catalogue highlights prompt delivery and customer satisfaction." },
];

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div className="about-copy">
          <p className="small-title">ABOUT MAXWELL</p>
          <h2>One stop shop for quality-proven home appliances.</h2>
          <p>
            Maxwell's 2025–26 Appliances Catalogue describes a product range designed for
            domestic, commercial and industrial applications, with an emphasis on durable,
            operationally reliable, user-friendly and innovative products.
          </p>
          <a className="about-link" href="#products">View Catalogue Range</a>
        </div>
        <div className="about-points">
          {points.map(({ icon: Icon, title, text }) => (
            <div className="about-point" key={title}>
              <div className="about-icon"><Icon size={20} /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
