export function Comments() {
  return (
    <section
      className="w-full mt-8"
      ref={(element) => {
        if (!element) return;
        const script = document.createElement("script");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("repo", "KimPinot/plog-comments");
        script.setAttribute("issue-term", "pathname");
        script.setAttribute("label", "comment :speech_balloon:");
        script.setAttribute("theme", "github-light");
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("async", "true");
        element.replaceChildren(script);
      }}
    />
  );
}
