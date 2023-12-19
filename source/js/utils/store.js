const useStore = {
    set: function (key, value) {
        if (!key || !value) {
            return;
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    get: function (key) {
        var value = localStorage.getItem(key);

        if (!value) {
            return null;
        }

        // 尝试解析为JSON
        try {
            value = JSON.parse(value);
        } catch (e) {
            // 不是JSON，无需处理
        }

        return value;
    },

    remove: function (key) {
        localStorage.removeItem(key);
    },
};
