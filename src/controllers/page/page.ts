import {IEntry, Request} from '../../services/facebook/request';

export class PageController {
  private readonly entries: IEntry[];

  constructor(entries: IEntry[]) {
    this.entries = entries;
  }

  public execute() {
    let entry: IEntry;
    for (let i = 0, n = this.entries.length; i < n; i++) {
      entry = this.entries[i];
      PageController.executeEntry(entry);
    }
  }

  private static executeEntry(entry: IEntry) {
    const action = Request.getAction(entry);
    switch (action) {
      case 'messaging':

        break;
    }
  }
}
