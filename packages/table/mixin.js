export default {
    methods: {
        alignCls (column, row = {}) {
            let cellClassName = '';
            if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                cellClassName = row.cellClassName[column.key];
            }
            return [
                {
                    [`${cellClassName}`]: cellClassName,    // cell className
                    [`${column.className}`]: column.className,    // column className
                    [`${this.prefixCls}-column-${column.align}`]: column.align,
                    [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
                }
            ];
        },
        setCellWidth (column, index, top) {
            let width = '';
            if (column.width) {
                width = column.width;
            } else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }
            // 如果有滚动条，则加滚动条宽度
            // if (this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0 && this.$parent.isScrollY) {
            //     width += this.$parent.scrollBarWidth;
            // }
            // 如果为右固定，则加滚动条宽度
            // if (this.fixed === 'right') {
            //     const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right');
            //     if (firstFixedIndex === index) width += this.$parent.scrollBarWidth;
            // }
            if (width === '0') width = '';
            // if (width == "") width = 50
            // console.log('s')
            return width;
        }
    }
};
