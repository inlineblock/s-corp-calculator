# S-Corp vs LLC Tax Calculator

A modern, multilingual web application that helps business owners determine whether they should structure their business as an S-Corporation or LLC for optimal tax benefits.

## ✨ Features

- **Tax Comparison**: Compare total tax liability between single-member LLC and S-Corp structures
- **Interactive Salary Planning**: Adjust S-Corp salary with an intuitive slider to see real-time tax implications
- **State-Specific Calculations**: Accurate tax calculations for all 50 US states
- **Multilingual Support**: Available in English, Spanish, French, Japanese, and Arabic
- **Responsive Design**: Modern, spaceship-inspired UI that works on all devices
- **Real-time Results**: See instant feedback on potential tax savings or costs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd s-corp-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Building

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🌍 Internationalization

The application supports multiple languages:
- **English** (`en`)
- **Spanish** (`es`)
- **French** (`fr`)
- **Japanese** (`ja`)
- **Arabic** (`ar`)

Language is automatically detected from the URL path (e.g., `/es/`, `/fr/`).

## 🧮 How It Works

The calculator compares two business structures:

### Single-Member LLC
- All income subject to self-employment tax (15.3%)
- Federal and state income taxes on full amount
- Simple tax structure

### S-Corporation
- Reasonable salary subject to payroll taxes (15.3% combined)
- Remaining income distributed as profits (no self-employment tax)
- Potential tax savings on distributions

## 🏛️ Tax Considerations

**Important**: This calculator provides estimates for educational purposes only. Tax situations vary greatly, and you should consult with a qualified tax professional or CPA before making business structure decisions.

### Factors Considered
- Self-employment tax savings
- Federal income tax brackets
- State income tax rates
- Payroll tax obligations
- Reasonable salary requirements

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Testing**: Jest + React Testing Library
- **Language**: TypeScript
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/[locale]/          # Internationalized pages
├── components/            # Reusable UI components
│   ├── Calculator.tsx     # Main calculator component
│   ├── IncomeInput.tsx    # Income input field
│   ├── SalarySlider.tsx   # Salary adjustment slider
│   ├── StateSelector.tsx  # State selection dropdown
│   ├── TaxResults.tsx     # Results display
│   └── __tests__/         # Component tests
├── lib/                   # Business logic
│   ├── taxCalculations.ts # Tax calculation functions
│   └── __tests__/         # Logic tests
├── i18n/                  # Internationalization setup
└── middleware.ts          # Next.js middleware
```

## 🎯 Business Rules

- Compares single-member LLC vs single-member S-Corp only
- Salary slider maximum is set to total income
- State selection affects state income tax calculations
- Results show annual tax savings/costs
- Mobile-responsive design required

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This calculator is for informational purposes only and should not be considered professional tax advice. Business structure decisions have significant legal and tax implications. Always consult with qualified professionals including CPAs, tax attorneys, and business advisors before making business structure decisions.
