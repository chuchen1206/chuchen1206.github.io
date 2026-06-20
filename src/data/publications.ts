export type PublicationCategory = "journal" | "conference" | "preprint" | "patent";

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: PublicationCategory;
  link?: string;
  note?: string;
}

export const publications: Publication[] = [
  {
    title:
      "Circular quasiconformal deturbulence: Geometry-based restoration from multiple turbulent frames",
    authors: "Chen, Chu; Han, Zhang; Lui, Lok Ming",
    venue: "Neurocomputing",
    year: 2026,
    category: "journal"
  },
  {
    title: "LamiGauss: Pitching Radiative Gaussian for Sparse-View X-ray Laminography Reconstruction",
    authors:
      "Chu Chen; Ander Biguri; Jean-Michel Morel; Raymond H. Chan; Carola-Bibiane Schonlieb; Jizhou Li",
    venue: "IEEE ICASSP",
    year: 2026,
    category: "conference"
  },
  {
    title: "High-Quality CEST Mapping With Lorentzian-Model Informed Neural Representation",
    authors:
      "Chu Chen; Yang Liu; Se Weon Park; Jizhou Li; Kannie W.Y. Chan; Jianpan Huang; Jean-Michel Morel; Raymond H. Chan",
    venue: "IEEE Transactions on Biomedical Engineering",
    year: 2025,
    category: "journal"
  },
  {
    title: "Blind Restoration of High-Resolution Ultrasound Video",
    authors:
      "Chu Chen; Kangning Cui; Pasquale Cascarano; Wei Tang; Elena Loli Piccolomini; Raymond H. Chan",
    venue: "MICCAI",
    year: 2025,
    category: "conference"
  },
  {
    title: "Implicit Regression in Subspace for High-Sensitivity CEST Imaging",
    authors:
      "Chu Chen; Yang Liu; Se Weon Park; Jizhou Li; Kannie W.Y. Chan; Raymond H. Chan",
    venue: "IEEE ISBI",
    year: 2024,
    category: "conference"
  },
  {
    title: "Blind Adaptive Local Denoising for CEST Imaging",
    authors:
      "Chu Chen; Aitor Artola; Yang Liu; Se Weon Park; Raymond H. Chan; Jean-Michel Morel; Kannie W.Y. Chan",
    venue: "arXiv:2511.20081",
    year: 2025,
    category: "preprint",
    link: "https://arxiv.org/abs/2511.20081"
  },
  {
    title: "DMNR: Unsupervised De-noising of Point Clouds Corrupted by Airborne Particles",
    authors: "Chu Chen; Yanqi Ma; Bingcheng Dong; Junjie Cao",
    venue: "arXiv:2305.05991",
    year: 2023,
    category: "preprint",
    link: "https://arxiv.org/abs/2305.05991"
  },
  {
    title:
      "An unsupervised denoising method for LiDAR point clouds corrupted by snow particles",
    authors: "Inventors: Chu Chen; Junjie Cao",
    venue: "Patent CN114926356A",
    year: 2024,
    category: "patent"
  }
];
