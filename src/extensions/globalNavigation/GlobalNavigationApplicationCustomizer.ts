import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import {
    BaseApplicationCustomizer,
    PlaceholderContent,
    PlaceholderName
} from "@microsoft/sp-application-base";
import { Dialog } from "@microsoft/sp-dialog";
import styles from "./GlobalNavigationApplicationCustomizer.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { ILink } from './ILink';
import { IGlobalNavProps, GlobalNav } from './components/GlobalNav';

import * as strings from "GlobalNavigationApplicationCustomizerStrings";

const LOG_SOURCE: string = "GlobalNavigationApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGlobalNavigationApplicationCustomizerProperties {
    links?: ILink[];
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalNavigationApplicationCustomizer extends BaseApplicationCustomizer<
    IGlobalNavigationApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
    
    @override
    public onInit(): Promise<void> {
        console.log("Properties:", this.properties);
        if(!this.properties.links) {
            console.error("No links have been configured.  Please configure the links for the global navigation in the tenant wide extensions' list properties.");
            return Promise.resolve();
        }

        if(!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Top,
                { onDispose: this._onDispose }
            );
        }

        if(!this._topPlaceholder) {
            console.error("Placeholder top not found.");
            return Promise.resolve();
        }

        const element: React.ReactElement<any> = React.createElement(
            GlobalNav, { links: this.properties.links }
        );

        ReactDom.render(element, this._topPlaceholder.domElement);

        return Promise.resolve();
    }

    private _onDispose(): void {
        console.log('[GlobalNavigationApplicationCustomizer._onDispose] Disposed custom top placeholder.');
      }
}
