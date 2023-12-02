export class ViewModel {
  private static filterUndefined(item: any) {
    const keys = Object.keys(item);

    for (const key of keys) {
      const val = item[key];
      if (val === undefined) {
        delete item[key];
      }
    }

    return item;
  }

  public static collection(arr?: any[] | Promise<any[]> | undefined) {
    if (arr && Array.isArray(arr)) {
      return arr.map((item) => this.filterUndefined(this.transform(item)));
    }

    return [];
  }

  public static item(item: any) {
    if (!item) {
      return {};
    }

    return this.filterUndefined(this.transform(item));
  }

  public static sortBy(arr: any[], field: string, direction = 'asc') {
    const sorter = (a: any, b: any) => {
      const dir = direction === 'asc' ? 1 : -1;

      if (a[field] < b[field]) {
        return -1 * dir;
      }
      if (a[field] > b[field]) {
        return dir;
      }
      return 0;
    };

    return arr.sort(sorter);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static transform(_: any) {
    return {};
  }
}
