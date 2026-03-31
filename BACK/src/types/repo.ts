export interface WithId {
    id: string;
}

export interface Repository<T extends WithId> {
    read: () => Promise<T[]>;
    readById: (id: T['id']) => Promise<T>;
    create: (data: Omit<T, 'id'>) => Promise<T>;
    updateById: (id: T['id'], data: Omit<Partial<T>, 'id'>) => Promise<T>;
    deleteById: (id: T['id']) => Promise<T>;
}
