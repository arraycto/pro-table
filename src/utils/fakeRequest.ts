/** 用于模拟网络请求方法 */
export class FakeRequest {
    data: Record<string, any>[] = [];
    id = '1';
    ms = 300;
    constructor (data: Record<string, any>[] = [], ms = 300) {
        this.data = data.map(v => {
            v.id = this.id;
            this.id = String(+this.id + 1);
            return v;
        });
        this.ms = ms;
    }

    /** 查找数据方法，用于 dataSource 使用 */
    findData = (requestData: { data: any, page: any }): Promise<any> => {
        return new Promise(resolve => {
            const query = requestData.data || {};
            const { currentPage = 1, linesPerPage = 10 } = requestData.page || {};
            const orderBy = (requestData.page.orderBys || [])[0] || {};
            let result = [...this.data];

            // 排序处理
            if (orderBy.sortField) {
                const isAsc = orderBy.sortType === 'asc';

                result.sort((a, b) => {
                    let aValue = a[orderBy.sortField];
                    let bValue = b[orderBy.sortField];

                    if (orderBy.sortField === 'updatedTime') {
                        aValue = new Date(aValue).getTime();
                        bValue = new Date(bValue).getTime();
                    }
                    return (aValue - bValue) * (isAsc ? -1 : 1);
                });
            }

            // 查询
            result = result.filter(v => {
                for (const [key, value] of Object.entries(query)) {
                    if (!new RegExp(value as string).test(v[key])) {
                        return false;
                    }
                }
                return true;
            });

            setTimeout(() => {
                resolve({
                    list: result.slice((currentPage - 1) * linesPerPage, currentPage * linesPerPage),
                    page: {
                        currentPage,
                        linesPerPage,
                        totalNum: result.length,
                        totalPage: Math.ceil(result.length / linesPerPage)
                    }
                });
            }, this.ms);
        });
    }

    /** 添加或更新数据 */
    addOrUpdateItem = (item: Record<string, any>, ms = 300): Promise<boolean> => {
        return new Promise(resolve => {
            const now = new Date();
            const date = now.toLocaleDateString().replace(/\//g, '-');
            const time = now.toTimeString().slice(0, 8);

            item.updatedTime = `${date} ${time}`;

            if (item.id) {
                const currentIndex = this.data.findIndex(v => v.id === item.id);

                this.data[currentIndex] = item;
            } else {
                this.id = String(+this.id + 1);
                item.id = this.id;
                this.data.unshift(item);
            }
            this.data.sort((a, b) => {
                const aValue = new Date(a.updatedTime).getTime();
                const bValue = new Date(b.updatedTime).getTime();

                return bValue - aValue;
            });
            setTimeout(() => {
                resolve(true);
            }, ms);
        });
    }

    /** 删除数据 */
    deleteItem = (id: string): Promise<boolean> => {
        return new Promise(resolve => {
            this.data = this.data.filter(item => item.id !== id);

            setTimeout(() => {
                resolve(true);
            }, this.ms);
        });
    }
}
