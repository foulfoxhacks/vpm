# FoulFoxHacks Packages (VPM listing)

The VRChat Creator Companion listing for FoulFoxHacks world tools, home of **BetterYTS by FoulFoxHacks**.

**Add to VCC:** `https://vpm.foulfoxhacks.dev/index.json` · [one-click add](vcc://vpm/addRepo?url=https%3A%2F%2Fvpm.foulfoxhacks.dev%2Findex.json) · [listing page](https://vpm.foulfoxhacks.dev)

| Package | |
|---|---|
| `com.foulfoxhacks.core` | Shared UdonSharp building blocks |
| `com.foulfoxhacks.betteryts` | In-world ad-free YouTube search panel |
| `com.foulfoxhacks.betteryts.protv` | BetterYTS for ProTV 3 |
| `com.foulfoxhacks.betteryts.editor` | Unity editor tools |

Package source and docs: [foulfoxhacks/betteryts-vrchat](https://github.com/foulfoxhacks/betteryts-vrchat).

## How this repo works

Built from VRChat's [template-package-listing](https://github.com/vrchat-community/template-package-listing).

- [`source.json`](source.json) lists the GitHub repos whose releases are indexed (`githubRepos`).
- [`.github/workflows/build-listing.yml`](.github/workflows/build-listing.yml) runs VRChat's [package-list-action](https://github.com/vrchat-community/package-list-action):
  it reads every `.zip` in those releases, writes `index.json`, renders the landing page from [`Website/`](Website), and deploys to GitHub Pages.
  It runs on changes to `source.json` or `Website/`, every 6 hours, or manually (Actions > Build Repo Listing > Run workflow).
- `Website/CNAME` and the Pages custom-domain setting serve it at `vpm.foulfoxhacks.dev` (DNS: `CNAME vpm → foulfoxhacks.github.io`, not proxied).
- Pages source must be set to **GitHub Actions** (Settings > Pages).

Branding uses the [akasammythepuppy.me](https://akasammythepuppy.me) palette; see `Website/styles.css` and the theme block in `Website/app.js`.
