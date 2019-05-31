
export default class MockIndex {
    static instance: MockIndex;
    static getInstance() {
        if ( !MockIndex.instance ) {
            MockIndex.instance = new MockIndex();
        }
        return MockIndex.instance;
    }
}