const MARKER = /(\[PODACI KLIJENTA[^\]]*\])/g

/** Highlights the [PODACI KLIJENTA …] markers that still have to be filled in. */
export function WithPlaceholders({ text }: { text: string }) {
  return (
    <>
      {text.split(MARKER).map((part, i) =>
        part.startsWith('[PODACI KLIJENTA') ? (
          <mark key={i} className="placeholder">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
