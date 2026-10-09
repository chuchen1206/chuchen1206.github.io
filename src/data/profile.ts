export type ThemeKey = "inverse" | "imaging" | "geometry";

export interface Palette {
  bg: string;
  primary: string;
  secondary: string;
  ink: string;
}

export interface ResearchTheme {
  key: ThemeKey;
  title: string;
  description: string;
  keywords: string[];
  palette: Palette;
}

export interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  detail?: string;
  logo?: string;
  logoAlt?: string;
}

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  department: string;
  crest: string;
  location: string;
  city: string;
  bio: string;
  emails: string[];
  links: {
    department: string;
    orcid: string;
    linkedin: string;
    scholar: string;
    github: string;
  };
  portrait: string;
  researchInterests: string[];
  researchThemes: ResearchTheme[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  affiliations: TimelineEntry[];
}

export const profile: Profile = {
  name: "Chu Chen",
  title: "Postdoctoral Research Fellow",
  subtitle: "University of Cambridge",
  department: "Department of Engineering",
  crest: "/images/logos/cambridge-shield.png",
  location: "BN4-70, Department of Engineering, Trumpington Street, Cambridge CB2 1PZ, UK",
  city: "Cambridge, UK",
  bio: "I build mathematical and learning-based methods that recover what measurements hide.",
  emails: ["cc2331@cam.ac.uk"],
  links: {
    department: "https://www.eng.cam.ac.uk/profiles/cc2331",
    orcid: "https://orcid.org/0000-0002-3055-6988",
    linkedin: "https://www.linkedin.com/in/chuchen99/",
    scholar: "https://scholar.google.com/citations?user=QP_BDK0AAAAJ&hl=zh-CN",
    github: "https://github.com/chuchen1206"
  },
  portrait: "/images/web/chu.jpg",
  researchInterests: [
    "Scientific Computing",
    "Signal and Image Processing",
    "Inverse Problems",
    "Deep Learning",
    "Computational Geometry",
    "Medical Imaging"
  ],
  researchThemes: [
    {
      key: "inverse",
      title: "Inverse Problems & Scientific Computing",
      description:
        "Reconstructing images and signals from incomplete, noisy or degraded measurements, where variational models, physics and learning meet.",
      keywords: ["Sparse-view reconstruction", "Blind restoration", "Implicit neural representations"],
      palette: { bg: "#efe6d8", primary: "#d9714e", secondary: "#7d8b5a", ink: "#1d1d1f" }
    },
    {
      key: "imaging",
      title: "Medical Imaging",
      description:
        "Quantitative MRI, ultrasound and X-ray imaging: making faint physiological signals measurable, reliable and fast.",
      keywords: ["CEST MRI", "Ultrasound", "X-ray laminography"],
      palette: { bg: "#0a3d8f", primary: "#ffffff", secondary: "#f2c14e", ink: "#75aadb" }
    },
    {
      key: "geometry",
      title: "Geometry & 3D Vision",
      description:
        "Quasiconformal geometry and point-cloud processing for restoring structure in images and 3D scenes.",
      keywords: ["Quasiconformal maps", "Point clouds", "Computational geometry"],
      palette: { bg: "#1d1d1f", primary: "#f2c14e", secondary: "#d9714e", ink: "#75aadb" }
    }
  ],
  experience: [
    {
      period: "Aug 2026 – Present",
      role: "Postdoctoral Research Fellow",
      institution: "Department of Engineering, University of Cambridge",
      detail: "Machine Intelligence Lab",
      logo: "/images/logos/cambridge-shield.png",
      logoAlt: "University of Cambridge logo"
    },
    {
      period: "May 2025 – Nov 2025",
      role: "Visiting Ph.D. Student",
      institution: "DAMTP, University of Cambridge",
      detail: "Cambridge Image Analysis Group",
      logo: "/images/logos/cambridge-shield.png",
      logoAlt: "University of Cambridge logo"
    }
  ],
  education: [
    {
      period: "Aug 2022 – Jul 2026",
      role: "Ph.D.",
      institution: "City University of Hong Kong",
      logo: "/images/logos/cityu.svg",
      logoAlt: "City University of Hong Kong logo"
    },
    {
      period: "Sep 2018 – Jun 2022",
      role: "B.S. in Computational Mathematics",
      institution: "Dalian University of Technology",
      logo: "/images/logos/dut.png",
      logoAlt: "Dalian University of Technology emblem"
    }
  ],
  affiliations: [
    {
      period: "Aug 2022 – Jul 2026",
      role: "",
      institution: "Hong Kong Centre for Cerebro-cardiovascular Health Engineering",
      logo: "/images/logos/coche.png",
      logoAlt: "COCHE logo"
    }
  ]
};
