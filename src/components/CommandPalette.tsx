import { useEffect, useState } from "react";
import { FolderGit2, Hash } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects } from "@/data/projects";
import { cn, scrollTo } from "@/lib/utils";
import styles from "@/styles/Home.module.css";

const sections = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "services", label: "services" },
  { id: "contact", label: "contact" },
] as const;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [hotkey, setHotkey] = useState("Ctrl+K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    setHotkey(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jumpTo = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      scrollTo(document.querySelector(`#${id}`));
    });
  };

  const openProject = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          styles.pill,
          "hidden font-mono tracking-tight sm:inline-flex",
        )}
        aria-label="Open command palette"
      >
        Press {hotkey}
        <span className="ml-1.5 inline-block h-3 w-px animate-blink bg-primary" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative overflow-hidden border-primary/20 bg-background font-mono">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--foreground)/0.035)_3px)]"
          />
          <div className="relative z-20">
            <div className="flex items-center justify-between border-b border-primary/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-primary">guest@abhirajdev</span>
              <span>cmdk</span>
            </div>
            <CommandInput
              placeholder="type a command…"
              className="font-mono text-sm caret-primary"
            />
            <CommandList>
              <CommandEmpty className="font-mono text-xs text-muted-foreground">
                no matches.
              </CommandEmpty>
              <CommandGroup
                heading="// navigate"
                className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest"
              >
                {sections.map((section) => (
                  <CommandItem
                    key={section.id}
                    value={`section ${section.label}`}
                    onSelect={() => jumpTo(section.id)}
                    className="font-mono text-xs tracking-tight"
                  >
                    <Hash className="mr-2 h-3.5 w-3.5 text-primary" />
                    {section.label}
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      #{section.id}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup
                heading="// projects"
                className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest"
              >
                {projects.map((project) => (
                  <CommandItem
                    key={project.title}
                    value={`project ${project.title} ${project.description}`}
                    onSelect={() => openProject(project.href)}
                    className="font-mono text-xs tracking-tight"
                  >
                    <FolderGit2 className="mr-2 h-3.5 w-3.5 text-primary" />
                    {project.title}
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      open
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
