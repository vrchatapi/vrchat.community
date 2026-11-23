import { githubAccessKey } from "@/github";
import { GithubInfo as FumadocsGithubInfo } from "fumadocs-ui/components/github-info";
import type { ComponentProps } from "react";

export function GithubInfo(props: Omit<ComponentProps<typeof FumadocsGithubInfo>, "token">) {
  return <FumadocsGithubInfo {...props} token={githubAccessKey} />;
}
