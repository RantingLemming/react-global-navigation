import * as React from 'react';
import styles from './GlobalNav.module.scss';
import { ILink } from '../ILink';
import { CommandBar, ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react';

export interface IGlobalNavProps {
    links: ILink[];
}

export class GlobalNav extends React.Component<IGlobalNavProps, {}> {
    public render(): React.ReactElement<IGlobalNavProps> {
        const { links } = this.props;
        const navItems: IContextualMenuItem[] = links.map(link => {
            console.log("Link:", link);
            return {
                key: link.name,
                name: link.name,
                subMenuProps: {
                    items: link.children ? link.children.map(subLink => {
                        return {
                            key: subLink.name,
                            name: subLink.name,
                            href: subLink.url
                        };
                    }) : []
                }
            };
        });
        console.log(navItems);
        return (
            <div className={styles.globalNav}>
                <CommandBar
                    className={styles.commandBar}
                    items={navItems}
                />
            </div>
        );
    }
}