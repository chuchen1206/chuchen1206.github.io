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
    category: "journal",
    link: "https://www.sciencedirect.com/science/article/pii/S0925231226016759"
  },
  {
    title: "LamiGauss: Pitching Radiative Gaussian for Sparse-View X-ray Laminography Reconstruction",
    authors:
      "Chu Chen; Ander Biguri; Jean-Michel Morel; Raymond H. Chan; Carola-Bibiane Schonlieb; Jizhou Li",
    venue: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    year: 2026,
    category: "conference",
    link: "https://ieeexplore.ieee.org/abstract/document/11460905"
  },
  {
    title: "High-Quality CEST Mapping With Lorentzian-Model Informed Neural Representation",
    authors:
      "Chu Chen; Yang Liu; Se Weon Park; Jizhou Li; Kannie W.Y. Chan; Jianpan Huang; Jean-Michel Morel; Raymond H. Chan",
    venue: "IEEE Transactions on Biomedical Engineering",
    year: 2025,
    category: "journal",
    link: "https://doi.org/10.1109/TBME.2025.3574238"
  },
  {
    title: "Blind Restoration of High-Resolution Ultrasound Video",
    authors:
      "Chu Chen; Kangning Cui; Pasquale Cascarano; Wei Tang; Elena Loli Piccolomini; Raymond H. Chan",
    venue: "Medical Image Computing and Computer Assisted Intervention (MICCAI)",
    year: 2025,
    category: "conference",
    link: "https://link.springer.com/chapter/10.1007/978-3-032-04947-6_8"
  },
  {
    title: "Implicit Regression in Subspace for High-Sensitivity CEST Imaging",
    authors:
      "Chu Chen; Yang Liu; Se Weon Park; Jizhou Li; Kannie W.Y. Chan; Raymond H. Chan",
    venue: "IEEE International Symposium on Biomedical Imaging (ISBI)",
    year: 2024,
    category: "conference",
    link: "https://doi.org/10.1109/ISBI56570.2024.10635440"
  },
  {
    title:
      "SEAF-Net: A Sustainable and Lightweight Attention-Enhanced Detection Network for Underwater Fish Species Recognition",
    authors:
      "Han, Yu-Shan; Sheng-Lun Zhao; Chu Chen; Kangning Cui; Pingfan Hu; Rui-Feng Wang",
    venue: "Journal of Marine Science and Engineering",
    year: 2026,
    category: "journal",
    link: "https://doi.org/10.3390/jmse14040351"
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
      "ReDiStory: Region-Disentangled Diffusion for Consistent Visual Story Generation",
    authors:
      "Sarkar, Ayushman; Zhenyu Yu; Chu Chen; Wei Tang; Kangning Cui; Mohd. Yamani Idna Idris",
    venue: "arXiv:2602.01303",
    year: 2026,
    category: "preprint",
    link: "https://arxiv.org/abs/2602.01303"
  },
  {
    title:
      "StoryState: Agent-Based State Control for Consistent and Editable Storybooks",
    authors:
      "Sarkar, Ayushman; Zhenyu Yu; Wei Tang; Chu Chen; Kangning Cui; Mohd. Yamani Idna Idris",
    venue: "arXiv:2602.01305",
    year: 2026,
    category: "preprint",
    link: "https://arxiv.org/abs/2602.01305"
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
