# ui

Reusable UI components based on Tailwind and shadcn-ui.

To add component from the shadcn-ui to ui-kit, run the following command:

```bash
bunx --bun shadcn-tailwind-config@latest add [component]  # create a new component
```


## Usage

```tsx
import { Button } from "ui"

const App = () => <Button variant="outline">Click me</Button>
```