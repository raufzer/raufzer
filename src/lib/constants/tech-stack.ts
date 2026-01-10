// Raw SVG imports - Programming Languages & Frameworks
import GoIcon from '@/assets/icons/go.svg?raw'
import PythonIcon from '@/assets/icons/python.svg?raw'
import DartIcon from '@/assets/icons/dart.svg?raw'
import FlutterIcon from '@/assets/icons/flutter.svg?raw'
import GinIcon from '@/assets/icons/gin.svg?raw'
import CobraIcon from '@/assets/icons/cobra.svg?raw'
import CollyIcon from '@/assets/icons/colly.svg?raw'
import HugoIcon from '@/assets/icons/hugo.svg?raw'
import AstroIcon from '@/assets/icons/astro.svg?raw'

// Raw SVG imports - Databases
import PostgreSQLIcon from '@/assets/icons/postgresql.svg?raw'
import MongoDBIcon from '@/assets/icons/mongodb.svg?raw'
import MySQLIcon from '@/assets/icons/mysql.svg?raw'
import SQLiteIcon from '@/assets/icons/sqlite.svg?raw'
import RedisIcon from '@/assets/icons/redis.svg?raw'
import FirebaseIcon from '@/assets/icons/firebase.svg?raw'

// Raw SVG imports - AI/ML & Data Science
import TensorflowIcon from '@/assets/icons/tensorflow.svg?raw'
import PytorchIcon from '@/assets/icons/pytorch.svg?raw'
import SklearnIcon from '@/assets/icons/scikitlearn.svg?raw'
import PandasIcon from '@/assets/icons/pandas.svg?raw'
import NumpyIcon from '@/assets/icons/numpy.svg?raw'
import MatplotlibIcon from '@/assets/icons/matplotlib.svg?raw'
import JupyterIcon from '@/assets/icons/jupyter.svg?raw'
import NetworkxIcon from '@/assets/icons/networkx.svg?raw'

// Raw SVG imports - Tools & Services
import DockerIcon from '@/assets/icons/docker.svg?raw'
import GitIcon from '@/assets/icons/git.svg?raw'
import GithubIcon from '@/assets/icons/github.svg?raw'
import GithubActionsIcon from '@/assets/icons/githubactions.svg?raw'


const processSVGWithViewBox = (svg: string) => {
  let out = svg.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
  const svgTagMatch = out.match(/<svg([^>]*)>/);
  if (!svgTagMatch) return out;
  const attrs = svgTagMatch[1];
  const widthMatch = attrs.match(/width="(\d+(?:\.\d+)?)"/);
  const heightMatch = attrs.match(/height="(\d+(?:\.\d+)?)"/);
  const width = widthMatch ? parseFloat(widthMatch[1]) : null;
  const height = heightMatch ? parseFloat(heightMatch[1]) : null;
  const viewBox = width && height ? `0 0 ${width} ${height}` : '0 0 24 24';
  out = out.replace(/<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor">`);
  return out;
};

export const TECH_STACK = [
  // Programming Languages
  {
    title: "Go",
    href: "https://go.dev/",
    icon: GoIcon,
  },
  {
    title: "Python",
    href: "https://www.python.org/",
    icon: PythonIcon,
  },
  {
    title: "Dart",
    href: "https://dart.dev/",
    icon: DartIcon,
  },

  // Frameworks
  {
    title: "Flutter",
    href: "https://flutter.dev/",
    icon: FlutterIcon,
  },
  {
    title: "Gin",
    href: "https://gin-gonic.com/",
    icon: GinIcon,
  },
  {
    title: "Cobra",
    href: "https://cobra.dev/",
    icon: CobraIcon,
  },
  {
    title: "Colly",
    href: "http://go-colly.org/",
    icon: CollyIcon,
  },
  {
    title: "Hugo",
    href: "https://gohugo.io/",
    icon: HugoIcon,
  },
  {
    title: "Astro",
    href: "https://astro.build/",
    icon: AstroIcon,
  },

  // Databases
  {
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: PostgreSQLIcon,
  },
  {
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: MongoDBIcon,
  },
  {
    title: "MySQL",
    href: "https://www.mysql.com/",
    icon: MySQLIcon,
  },
  {
    title: "SQLite",
    href: "https://www.sqlite.org/",
    icon: SQLiteIcon,
  },
  {
    title: "Redis",
    href: "https://redis.io/",
    icon: RedisIcon,
  },
  {
    title: "Firebase",
    href: "https://firebase.google.com/",
    icon: FirebaseIcon,
  },

  // AI/ML & Data Science
  {
    title: "TensorFlow",
    href: "https://www.tensorflow.org/",
    icon: TensorflowIcon,
  },
  {
    title: "PyTorch",
    href: "https://pytorch.org/",
    icon: PytorchIcon,
  },
  {
    title: "scikit-learn",
    href: "https://scikit-learn.org/",
    icon: SklearnIcon,
  },
  {
    title: "Pandas",
    href: "https://pandas.pydata.org/",
    icon: PandasIcon,
  },
  {
    title: "NumPy",
    href: "https://numpy.org/",
    icon: NumpyIcon,
  },
  {
    title: "Matplotlib",
    href: "https://matplotlib.org/",
    icon: MatplotlibIcon,
  },
  {
    title: "Jupyter",
    href: "https://jupyter.org/",
    icon: JupyterIcon,
  },
  {
    title: "NetworkX",
    href: "https://networkx.org/",
    icon: NetworkxIcon,
  },

  // Tools & Services
  {
    title: "Docker",
    href: "https://www.docker.com/",
    icon: DockerIcon,
  },
  {
    title: "Git",
    href: "https://git-scm.com/",
    icon: GitIcon,
  },
  {
    title: "GitHub",
    href: "https://github.com/",
    icon: GithubIcon,
  },
  {
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
    icon: GithubActionsIcon,
  },
];

// .
for (const item of TECH_STACK) {
  try {
    if (item && typeof item.icon === 'string' && !/viewBox=/i.test(item.icon)) {
      item.icon = processSVGWithViewBox(item.icon);
    }
  } catch (e) {
  }
}

