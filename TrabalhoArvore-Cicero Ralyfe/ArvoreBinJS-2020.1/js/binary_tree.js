class BinaryTree {
    // inicia a raiz como nula  
    constructor() {
        this.root = null
    }

    //mostra o valor menor da arvore
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //mostra o maior valor da arvore

    /*Percorre toda arvore ate encontrar o valor de extrema direita,
    ou seja, a raiz com diretia nula sendo o maior elemento.*/
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    insert(element) { //recebe uma referencia do nó 
        this.root = this.insertNode(this.root, element)
        //retorna uma referencia do nó
    }
    
    //IMPLEMENTANDO O INSERT DA ARVORE
    /*recebe uma referencia e insere o nó;
      Ele analisa se é nulo e insere;
      analisa se é maior que a raiz;
      Se sim ele insere na direta;
      Se nao ele insere a esquerda;  
    */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    
    //a funcao recebe callback
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    
    /*analisa se o nó é nulo;
     *se sim, não retorna nada;
     *se não, manda mostrar em ordem;
     *esquerda,conteudo e direita do nó; 
    */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    // Percorre toda a arvore e mostra na esquencia de pré-ordem no caso raiz,esquerda e direita 
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }
    //recebe o nó e o callback 
    /*
        se nó for nullo não retorne nada;
        se não passe o conteudo do no dentro do callback;
        exibe a esquerda do nó;
        exibe seguida a direita do nó;  
    */ 
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
    //pós-ordem recebe o metodo e a função
       /* 
        se o nó for nulo, não retorne nada;
        se não, ira passar o conteudo do nó dentro do callback;
        exibe a esquerda do nó;
        exibe a direita do nó;  
       */
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore; 
    //  Busca na árvore binária;
    //  se é nulo, o elemento não existe;
    //  se é igual ao conteúdo, encontrou;
    //  se é maior que o conteúdo;
    //  busca na direita;
    //  busca na esquerda;     

    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
    //Retorna a nova arvore atualizada em removeVisitor

    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    /*Os dois primeiros if é para remoção onde os nós da direita e esquerda 
    são vazios, retornando valor nulo. O primeiro else if caso só tenha valor 
    no esquerdo retorna o mesmo o segundo else if é quando tem-se apenas valor 
    na direita e retorna o mesmo. O else é a raiz seja removida fazendo assim
    o maior valor vira a raiz, procura-se a extrema esquerda na antiga sub-arvore direita 
    e adiciona a arvore esquerda neste local  */

    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //não possui filhos - Grau 0
                return null
            } else if (node.right == null) {
                //não possui filhos na direita, e tem nó na esqueda - º 1
                return node.left
            } else if (node.left == null) {
                //não possui filhos da esquerda, e tem nó da direita - º 1
                return node.right
            } else {
                // tem os dois ramos - Grau º 2                 
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }
    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)
    }
    /*recebe um nó e sera nulo por padrao
    o nó não sendo null retornara -1
    leftHeight, analisa a altura da esquerda
    rightHeight, analisa a altura da direita
    retorna a variavel de maior valor + 1 que é uma contagem do outro nó 
    */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
       
    //retorna o tamamho a partir da raiz
    size() {

        return this.sizeVisitor(this.root)
    }
    /* 
    Se não existir nó retorna 0
    se for o contrario
    retorna o tamanho do nó da esquerda, o tamanho do nó da direita e o resultado somando com +1  
    */
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}