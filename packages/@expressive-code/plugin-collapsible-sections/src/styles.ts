import { StyleSettings, ExpressiveCodeTheme, ResolvedCoreStyles } from '@expressive-code/core'

export const collapsibleSectionClass = 'ec-section'

export const collapsibleSectionsStyleSettings = new StyleSettings({
	closedBorderWidth: '0px',
	closedPadding: '4px 0 4px calc(var(--padding-inline) + var(--indentation) * 1ch)',
	closedMargin: '0rem',
	closedTextColor: '',
	closedBackgroundColor: 'rgb(84 174 255 / 20%)',
	closedBorderColor: 'rgb(84 174 255 / 50%)',
	openBorderWidth: '1px',
	openPadding: '0rem',
	openMargin: '0rem',
	openBackgroundColor: 'rgb(246 248 250 / 7.5%)',
	openBorderColor: 'rgb(216 222 228 / 10%)',
})

export function getCollapsibleSectionsBaseStyles(
	theme: ExpressiveCodeTheme,
	coreStyles: ResolvedCoreStyles,
	styleOverrides: Partial<typeof collapsibleSectionsStyleSettings.defaultSettings>
) {
	const styles = collapsibleSectionsStyleSettings.resolve({
		theme,
		coreStyles,
		styleOverrides,
	})
	const result = `
		.${collapsibleSectionClass} {
			/* overwritten by each section to the number of spaces the first line starts with */
			/* this is just a default */
			--indentation: 0;

			& summary {
				/* hide the default <details> marker */
				&::marker {
					display: inline-block;
					content: "";
					width: 16px;
					height: 16px;
				}

				svg {
					vertical-align: text-bottom;
					fill: currentColor;
					margin-right: 1em;
					opacity: 0.75;
				}

				cursor: pointer;
				color: ${styles.closedTextColor};
				background-color: ${styles.closedBackgroundColor};
				--border-color: ${styles.closedBorderColor};
				--border-width: ${styles.closedBorderWidth};
				box-shadow:
					inset 0 calc(-1 * var(--border-width)) var(--border-color),
					inset 0 var(--border-width) var(--border-color);
				padding: ${styles.closedPadding};
				margin: ${styles.closedMargin};
			}

			&[open] {
				/* hide the <summary> when the lines are displayed */
				& summary {
					display: none;
				}

				background-color: ${styles.openBackgroundColor};
				--border-color: ${styles.openBorderColor};
				--border-width: ${styles.openBorderWidth};
				box-shadow:
					inset 0 calc(-1 * var(--border-width)) var(--border-color),
					inset 0 var(--border-width) var(--border-color);
				padding-inline: ${styles.openPadding};
				margin-inline: ${styles.openMargin};
			}
		}
	`

	return result
}
