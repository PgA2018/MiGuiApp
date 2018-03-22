import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { TruncatedTextComponent } from './truncated-text/truncated-text';
@NgModule({
	declarations: [ExpandableComponent,
    TruncatedTextComponent],
	imports: [],
	exports: [ExpandableComponent,
    TruncatedTextComponent]
})
export class ComponentsModule {}
