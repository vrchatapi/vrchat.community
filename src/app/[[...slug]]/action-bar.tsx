import { GitHubContributors } from "@/components/contributors";
import { GithubInfo } from "@/components/github-info";
import { githubUrl } from "@/github";
import { cn } from "@/lib/cn";
import { getPageContributors, getPageSource, icon, type source } from "@/lib/source";
import { Image } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import type { InferPageType } from "fumadocs-core/source";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { PageLastUpdate } from "fumadocs-ui/page";

function prettifyUrl(href: string) {
  const { host, pathname } = new URL(href);
  return `${host}${pathname}`;
}

export async function ActionBar({ page }: { page: InferPageType<typeof source> }) {
  if (page.data.type !== "docs") return null;

  const sourcePath = getPageSource(page);
  const contributors = await getPageContributors(page);

  const [contentGithubOrganization, contentGithubRepository] = page.data.github?.split("/") || [];

  return (
    <div className="flex flex-col gap-2 border-b pb-6">
      <div className="flex flex-row gap-2 items-center first:-ml-1.5">
        {/* <MarkdownCopyButton markdownUrl={markdownUrl} /> */}
        {/* <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        /> */}
        {page.data.links?.map((link) => (
          <Link
            key={link.href}
            className={cn(
              "p-2 rounded-lg text-sm text-fd-foreground/80 transition-colors lg:flex-row lg:items-center hover:text-fd-accent-foreground hover:bg-fd-accent flex items-center gap-2 truncate",
              buttonVariants({
                size: "sm",
                color: "ghost",
              }),
            )}
            href={link.href}
          >
            <span className="size-3.5 flex items-center">
              {link.icon ? (
                icon(link.icon)
              ) : (
                <Image
                  src={`https://icons.duckduckgo.com/ip3/${new URL(link.href).hostname}.ico`}
                  alt={`Icon for ${new URL(link.href).hostname}`}
                  width={14}
                  height={14}
                />
              )}
            </span>
            <span>{link.label || prettifyUrl(link.href)}</span>
          </Link>
        ))}
        {contentGithubOrganization && contentGithubRepository && (
          <GithubInfo
            className={buttonVariants({ size: "sm", color: "ghost" })}
            owner={contentGithubOrganization}
            repo={contentGithubRepository}
          />
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Link
          href={`${githubUrl}/blob/main/${sourcePath}`}
          className={buttonVariants({ color: "secondary", size: "sm" })}
        >
          Edit this page
        </Link>

        <GitHubContributors contributors={contributors} href={contentGithubRepository ? undefined : `${githubUrl}/graphs/contributors`} />
        {page.data.lastModified && <PageLastUpdate date={page.data.lastModified} />}
      </div>
    </div>
  );
}
