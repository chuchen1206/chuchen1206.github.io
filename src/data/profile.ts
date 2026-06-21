interface Position {
  role: string;
  institution: string;
  address: string;
  period?: string;
  advisor?: string;
  logo?: string;
  logoAlt?: string;
}

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  tagline: string;
  emails: string[];
  links: {
    orcid: string;
    linkedin: string;
    scholar: string;
    github: string;
  };
  researchInterests: string[];
  positions: Position[];
}

export const profile: Profile = {
  name: "Chu Chen",
  title: "Postdoctoral Research Fellow",
  subtitle: "University of Cambridge",
  location: "Trumpington Street, Cambridge CB2 1PZ, UK",
  tagline: "",
  emails: ["chucc9912@gmail.com"],
  links: {
    orcid: "https://orcid.org/0000-0002-3055-6988",
    linkedin: "https://www.linkedin.com/in/chuchen99/",
    scholar: "https://scholar.google.com/citations?user=QP_BDK0AAAAJ&hl=zh-CN",
    github: "https://github.com/chuchen1206"
  },
  researchInterests: [
    "Scientific Computing",
    "Signal and Image Processing",
    "Inverse Problems",
    "Deep Learning",
    "Computational Geometry",
    "Medical Imaging"
  ],
  positions: [
    {
      role: "Postdoctoral Research Fellow",
      institution: "Division of Information Engineering, Department of Engineering, University of Cambridge",
      address: "Department of Engineering, University of Cambridge, Trumpington Street, Cambridge CB2 1PZ, UK",
      logo: "/images/cambridge-logo.webp",
      logoAlt: "University of Cambridge logo"
      // period: "Aug 2026 - Present",
      // advisor: "Prof. Graham Treece"
    },
    // {
    //   role: "Ph.D. Student",
    //   institution: "City University of Hong Kong",
    //   period: "Aug 2022 - Jul 2026",
    //   advisor:
    //     "Prof. Jean-Michel Morel, Prof. Raymond H. Chan, and Prof. Ronald L.M. Lui"
    // }
  ]
};
