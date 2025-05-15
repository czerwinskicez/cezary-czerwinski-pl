import type { NextApiRequest, NextApiResponse } from 'next';
import { BlogPost } from './index';

type BlogPostResponse = {
  success: boolean;
  message?: string;
  post?: BlogPost & { content?: string };
};

// Mock blog post content - in a real app, you'd fetch this from a CMS or database
export const mockBlogPostContent: Record<string, string> = {
  'future-of-work-deep-tech': `
# 170 mln nowych ról deep-tech: jak uplasować się po jasnej stronie mocy?

## Wprowadzenie

World Economic Forum opublikował raport, który prognozuje, że do 2030 roku automatyzacja i AI mogą wyprzeć około 92 miliony miejsc pracy. Jednocześnie pojawi się aż 170 milionów nowych ról związanych z rozwojem i obsługą zaawansowanych technologii.

## Kluczowe kompetencje przyszłości

Aby znaleźć się po "jasnej stronie mocy" i skorzystać z tych nowych możliwości, warto rozwijać następujące umiejętności:

1. **Zaawansowana analiza danych** - umiejętność wyciągania wartościowych wniosków z dużych zbiorów danych
2. **Adaptacyjne rozwiązywanie problemów** - zdolność do radzenia sobie z niejednoznacznymi, złożonymi problemami
3. **Projektowanie doświadczeń AI/człowiek** - tworzenie efektywnych interfejsów między ludźmi a systemami AI
4. **Tłumaczenie potrzeb biznesowych na rozwiązania technologiczne** - umiejętność "połączenia światów"

## Przykładowe ścieżki kariery

Najbardziej obiecujące ścieżki kariery w erze AI to:

- Inżynier ds. etyki AI
- Specjalista ds. interpretacji modeli uczenia maszynowego
- Architekt rozwiązań AI/ML
- Kurator danych

## Wnioski

Choć automatyzacja i AI rzeczywiście eliminują pewne stanowiska, tworzą jednocześnie znacznie więcej nowych możliwości. Kluczem jest proaktywne rozwijanie umiejętności, które pozwolą nam współpracować z technologią, zamiast być przez nią zastępowanym.
`,
  'sysml-v2-kotlin': `
# SysML v2 w praktyce: od diagramu do deploy'u w Kotlin-native

## Wstęp do SysML v2

OMG (Object Management Group) zbliża się do finalizacji specyfikacji SysML v2, która wprowadza znaczące ulepszenia w modelowaniu systemów inżynieryjnych. Przyjrzyjmy się, jak można wykorzystać tę specyfikację w praktycznym projekcie IoT.

## Nasz przykładowy projekt: Inteligentny moduł grzewczy

W tym artykule zaimplementujemy model systemu kontroli temperatury dla przemysłowego modułu grzewczego, wykorzystując:

1. Diagramy SysML v2 do modelowania systemu
2. Kotlin Native do implementacji sterowania
3. Rzeczywiste urządzenie IoT do walidacji modelu

## Kluczowe elementy SysML v2

SysML v2 wprowadza nowy język tekstowy oraz usprawnioną semantykę modelowania. Szczególnie przydatne są:

- Ulepszone modelowanie wymagań
- Precyzyjniejsze modelowanie zachowań
- Lepsza integracja z systemami wytwarzania oprogramowania

## Implementacja w Kotlin Native

Kotlin Native pozwala nam przekształcić modele SysML bezpośrednio w kod wykonywalny na urządzeniach wbudowanych, bez pośrednictwa JVM. Przykład implementacji kontrolera:

\`\`\`kotlin
class TemperatureController(
    private val sensor: TemperatureSensor,
    private val heater: HeatingElement
) {
    fun regulateTemperature(targetTemp: Float) {
        val currentTemp = sensor.readTemperature()
        when {
            currentTemp < targetTemp - HYSTERESIS -> heater.turnOn()
            currentTemp > targetTemp + HYSTERESIS -> heater.turnOff()
        }
    }
    
    companion object {
        private const val HYSTERESIS = 1.5f
    }
}
\`\`\`

## Wnioski

SysML v2 w połączeniu z nowoczesnymi językami programowania jak Kotlin pozwala na płynne przejście od modelu do działającego systemu. Ta kombinacja jest szczególnie wartościowa w projektach IoT, gdzie precyzyjne modelowanie i efektywna implementacja mają kluczowe znaczenie.
`,
  'developer-experience-devops': `
# Developer Experience > DevOps? Case study z platformy serwisowej

## Problem: Wąskie gardło w procesie DevOps

W naszej organizacji zespół DevOps stał się wąskim gardłem - każda zmiana w konfiguracji CI/CD wymagała interwencji specjalistów, co wydłużało czas dostarczania nowych funkcjonalności.

## Rozwiązanie: Platform Engineering

Zamiast tradycyjnego modelu, gdzie DevOps obsługuje wszystkie potrzeby zespołów deweloperskich, stworzyliśmy samoobsługową platformę inżynieryjną z następującymi komponentami:

1. **Self-service Portal** - interfejs webowy pozwalający deweloperom na samodzielne konfigurowanie i zarządzanie swoimi pipelinami CI/CD
2. **Infrastructure as Code Templates** - gotowe szablony infrastruktury dla typowych przypadków użycia
3. **Automatic Policy Enforcement** - zautomatyzowane wymuszanie zgodności z politykami bezpieczeństwa i standardami kodu

## Technologia

Platforma została zbudowana przy użyciu:
- Frontend: React z TypeScript
- Backend: Node.js z Express
- IaC: Pulumi
- CI/CD: GitHub Actions

## Wyniki

Po 6 miesiącach od wdrożenia platformy:

- Przepustowość zespołów wzrosła o 38% (mierzone w ukończonych story points)
- Średni czas od commita do deploymentu skrócił się o 61%
- Liczba zgłoszeń do zespołu DevOps spadła o 74%

## Wnioski

Developer Experience staje się nowym paradygmatem, który może zastąpić tradycyjny DevOps. Kluczem jest przejście od modelu "DevOps jako usługa" do modelu "DevOps jako platforma", dając deweloperom narzędzia do samodzielnego zarządzania infrastrukturą i procesami.
`
};

// This reuses the mock blog posts from the index endpoint
// In a real app, you would fetch this from a database

const mockBlogPosts: BlogPost[] = [
  {
    slug: "future-of-work-deep-tech",
    title: "170 mln nowych ról deep-tech: jak uplasować się po jasnej stronie mocy?",
    date: "2025-05-20",
    category: "Future-of-Work",
    excerpt: "WEF ostrzega i motywuje: automatyzacja zabierze 92 mln etatów, ale stworzy znacznie więcej. Pokażę Ci mapę kompetencji, które dają przewagę.",
    tag: "FutureWork",
    heroImg: "/img/future.webp",
    readingTime: "7 min"
  },
  {
    slug: "sysml-v2-kotlin",
    title: "SysML v2 w praktyce: od diagramu do deploy'u w Kotlin-native",
    date: "2025-06-02",
    category: "MBSE / SysML v2",
    excerpt: "Beta-specyfikacja SysML v2 już jest, a OMG zapowiada finalizację w tym roku. Robimy POC na realnym module IoT (grzałki).",
    tag: "MBSE",
    heroImg: "/img/future.webp",
    readingTime: "9 min"
  },
  {
    slug: "developer-experience-devops",
    title: "Developer Experience &gt; DevOps? Case study z platformy serwisowej",
    date: "2025-06-15",
    category: "DevEx & Platform Engineering",
    excerpt: "Jak przerobiłem wewnętrzne CI/CD na self-service portal i zyskaliśmy +38 % przepustowości story points (mierzone w Flow Framework).",
    tag: "DevEx",
    heroImg: "/img/future.webp",
    readingTime: "6 min"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPostResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use GET.'
    });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid post slug'
    });
  }

  try {
    // Find the post by slug
    const post = mockBlogPosts.find(post => post.slug === slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Get the post content
    const content = mockBlogPostContent[slug] || '';

    return res.status(200).json({
      success: true,
      post: {
        ...post,
        content
      }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post.'
    });
  }
} 