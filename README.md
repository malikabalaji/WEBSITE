<div align="center">

# SplitPro

### Split expenses fairly. Settle up smartly.

**Group trips are simple. The money afterwards is not. SplitPro does the math.**

Add your group, log who paid for what, and SplitPro instantly shows who owes whom, using the fewest possible transactions.

![HTML](https://img.shields.io/badge/HTML-62.7%25-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-37.3%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-2d7a4f?style=flat-square)
![Privacy](https://img.shields.io/badge/data-stays%20in%20your%20browser-1a1714?style=flat-square)

</div>

---

## The problem

Five friends. One trip. Twenty expenses. One person paid for the hotel, another covered dinner, two split the cab. By the end, nobody knows who owes what, and nobody wants to be the one who brings it up.

## The solution

SplitPro replaces the awkward spreadsheet with three clean tabs.

**Expenses.** Log anything in seconds: who paid, who participated, and the category. Every expense can use its own split method:

| Split mode | When to use it |
|---|---|
| Equal | Everyone shares alike |
| Unequal amounts | Different people owe different amounts |
| Percentage | Proportional splits |
| Shares | Weighted splits, such as a couple counting as two |

**Balances.** A live view of where each person stands: who is owed, who owes, and exactly how much.

**Settle Up.** The core of the product. Instead of everyone paying everyone, SplitPro computes the minimum set of transactions that clears all debts. Ten IOUs collapse into two or three simple payments.

## Under the hood

- **One HTML file. The entire application.** State management, split validation, live recalculation, settlement optimisation, notifications, and animations, with no framework and no build step.
- **Settlement algorithm.** Net balances are computed per person, then creditors and debtors are matched to minimise the number of payments required to bring every balance to zero.
- **Private by design.** All data lives in localStorage. No accounts, no servers, no third parties. Close the tab, return tomorrow, and everything is exactly as you left it.
- **A matching React authentication page** (`splitpro-login.jsx`) built on the same design system: full client-side validation, a password strength meter, and loading and success states, ready to connect to any auth backend.

## Design

A warm parchment background, deep green accents, editorial serif details, and a subtle grain texture. Most money apps feel cold. This one feels like a well-kept notebook.

## Quick start

```bash
git clone https://github.com/malikabalaji/WEBSITE.git
cd WEBSITE
open WEBSITE/expense-splitter.html
```

No installation, no dependencies, no configuration. Add a few people, log an expense, and the settlement suggestions appear immediately.

## Repository structure

```
WEBSITE/
├── WEBSITE/
│   └── expense-splitter.html   # The full SplitPro app (single file)
├── splitpro-login.jsx          # React login/signup page, same design system
└── README.md
```

---

<div align="center">

*Fair splits. Fewer transactions. No awkward conversations.*

</div>
